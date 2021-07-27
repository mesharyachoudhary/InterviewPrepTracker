const Topic = require('../models/Topic');
const Question = require('../models/Question');
exports.getTopic=async (req,res)=>{
    let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
    try{
        const topics = await Topic.find(searchOptions).sort({name:'asc'});
        const question = new Question()
        res.render('topiclist',{
            topics:topics,
            searchOptions: req.query,
            question:question,
            user:req.user
        });
    }
    catch{
        res.redirect('/');
    }
}
exports.getTopicByID=async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id)
      const questions = await Question.find({ topics: topic.id }).sort({difficulty:'asc'}).exec()
      res.render('questionlist', {
        topic:topic,
        questionbytopic: questions,
        user:req.user
      })
    } catch {
      res.redirect('/')
    }
  }
  exports.addNewQuestion= async (req,res)=>{
    const question = new Question({
      name: req.body.name,
      linkto: req.body.link,
      difficulty:req.body.difficulty,
      topics: req.body.topic
    })
    try{
      const newQuestion = await question.save()
      
      if(1)
      {
        req.flash('success_msg','Question is sent for approval !');
        res.redirect('/topics');
      }
      
    }
    catch{
          
      req.flash('error_msg','Please fill all fields ');    
      res.redirect('/topics')
    }
  }