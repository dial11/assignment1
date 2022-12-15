const express = require("express");
const router = express.Router();

const Posts = require("../schemas/posts");
//게시판 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({} , { content: false });
	res.json({ posts: posts });
});

//게시판 상세 조회 API
router.get("/posts/:id", async (req, res) => {
	const { id } = req.params;
    const posts = await Posts.find({});
	const [detail] = posts.filter((posts) => posts.id === id);
	res.json({ detail });
});
//게시판 데이터 넣기
router.post("/posts", async (req, res) => {
	const { title, content, createdAt } = req.body;
    const { id } = req.params;

  const posts = await Posts.find({_id: id});
  if (posts.length) {
    return res.status(400).json({ success: false, errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  const createdPosts = await Posts.create({ title, content, createdAt });

  res.status(201).json({ posts: createdPosts, Message: "게시글을 생성하였습니다." });
});

//게시판 데이터 수정
router.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const { content } = req.body;
  
    const existsPosts = await Posts.find({ _id: id });
    if (existsPosts.length) {
      await Posts.updateOne({ _id: id }, { $set: { title: title, content: content} });
    }
  
    res.status(200).json({ success: true, Message: "게시글을 수정하였습니다." });
  })
//게시판 데이터 제거
router.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
  
    const existsPosts = await Posts.find({ _id: id });
    if (existsPosts.length > 0) {
      await Posts.deleteOne({ _id: id });
    }
  
    res.json({ result: "success", Message: "게시글을 삭제하였습니다." });
  });

module.exports = router;