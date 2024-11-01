// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ProductContract {
    struct Product {
        uint id;
        string name;
        string description;
        address creator;
        uint feedbackCount;  // Feedback count is now part of each product
    }

    uint public productCount;
    mapping(uint => Product) public products;

    address public owner;
    uint public addProductFee = 0.0003816999 ether;

    event ProductAdded(uint productId, address creator, string name, string description);
    event FeedbackAdded(uint productId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProduct(string memory _name, string memory _description) public payable {
        require(msg.value >= addProductFee, "Insufficient fee for adding a product");

        productCount++;
        products[productCount] = Product({
            id: productCount,
            name: _name,
            description: _description,
            creator: msg.sender,
            feedbackCount: 0  // Initialize feedback count to 0
        });

        emit ProductAdded(productCount, msg.sender, _name, _description);
    }

    function addFeedback(uint _productId) public {
        // Ensure product exists
        require(_productId > 0 && _productId <= productCount, "Product does not exist");

        // Increment the feedback count directly in the product struct
        products[_productId].feedbackCount++;
        emit FeedbackAdded(_productId);
    }

    function getProduct(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }

    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);

        for (uint i = 1; i <= productCount; i++) {
            allProducts[i - 1] = products[i];
        }

        return allProducts;
    }

    function withdrawFees() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}

contract FeedbackContract {
    struct Feedback {
        uint id;
        uint productId;
        address author;
        string title;
        string description;
        string tag;
        uint upvotes;
        uint downvotes;
        Comment[] comments;
        mapping(address => bool) voters;
    }

    struct Comment {
        address commenter;
        string text;
    }

    struct FeedbackView {
        uint id;
        uint productId;
        address author;
        string title;
        string description;
        string tag;
        uint upvotes;
        uint downvotes;
        Comment[] comments;
    }

    uint public feedbackCount;
    mapping(uint => Feedback) public feedbacks;
    mapping(uint => uint[]) public productFeedbacks;

    address public owner;
    uint public upvoteFee = 0.00007874 ether;       // Fee for upvoting
    uint public feedbackFee = 0.00003937 ether;      // Fee for posting feedback
    uint public commentFee = 0.00003937 ether;     // Fee for adding a comment

    event FeedbackPosted(uint feedbackId, uint productId, address author, string title, string description, string tag);
    event FeedbackVoted(uint feedbackId, bool upvote, address voter);
    event CommentAdded(uint feedbackId, address commenter, string text);

    ProductContract public productContract;

    constructor(address _productContractAddress) {
        productContract = ProductContract(_productContractAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function postFeedback(uint _productId, string memory _title, string memory _description, string memory _tag) public payable {
        require(msg.value >= feedbackFee, "Insufficient fee for posting feedback");
        require(productContract.getProduct(_productId).id != 0, "Product does not exist");

        feedbackCount++;
        Feedback storage newFeedback = feedbacks[feedbackCount];

        newFeedback.id = feedbackCount;
        newFeedback.productId = _productId;
        newFeedback.author = msg.sender;
        newFeedback.title = _title;
        newFeedback.description = _description;
        newFeedback.tag = _tag;
        newFeedback.upvotes = 0;
        newFeedback.downvotes = 0;

        productFeedbacks[_productId].push(feedbackCount);

        emit FeedbackPosted(feedbackCount, _productId, msg.sender, _title, _description, _tag);
    }

    function voteFeedback(uint _feedbackId, bool _upvote) public payable {
        require(msg.value >= upvoteFee, "Insufficient fee for voting");

        Feedback storage feedback = feedbacks[_feedbackId];
        require(!feedback.voters[msg.sender], "You have already voted on this feedback");

        if (_upvote) {
            feedback.upvotes++;
        } else {
            feedback.downvotes++;
        }
        feedback.voters[msg.sender] = true;

        emit FeedbackVoted(_feedbackId, _upvote, msg.sender);
    }

    function commentOnFeedback(uint _feedbackId, string memory _text) public payable {
        require(msg.value >= commentFee, "Insufficient fee for adding a comment");

        Feedback storage feedback = feedbacks[_feedbackId];
        feedback.comments.push(Comment(msg.sender, _text));

        emit CommentAdded(_feedbackId, msg.sender, _text);
    }

    function getFeedbackByProduct(uint _productId) public view returns (FeedbackView[] memory) {
        uint[] memory feedbackIds = productFeedbacks[_productId];
        FeedbackView[] memory productFeedback = new FeedbackView[](feedbackIds.length);

        for (uint i = 0; i < feedbackIds.length; i++) {
            Feedback storage fb = feedbacks[feedbackIds[i]];
            productFeedback[i] = FeedbackView({
                id: fb.id,
                productId: fb.productId,
                author: fb.author,
                title: fb.title,
                description: fb.description,
                tag: fb.tag,
                upvotes: fb.upvotes,
                downvotes: fb.downvotes,
                comments: fb.comments
            });
        }
        return productFeedback;
    }

    function withdrawFees() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
