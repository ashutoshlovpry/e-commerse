const Item = require('../models/Item');

module.exports.get_items = (req,res) => {
    Item.find({category:req.body.category}).sort({date:-1}).limit(req.body.limit?req.body.limit:5).then(items => res.json(items));
}

module.exports.get_all_items = (req,res) => {
    Item.find({}).sort({date:-1}).then(items => res.json(items));
}

module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
}

module.exports.update_item = (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        });
    });
}

module.exports.delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}

module.exports.seach_item = (req,res) => {
    console.log("erc",req.body);
    let search=req.body.key
    Item.aggregate([{
        $match:{ "$or" :[
            {title:{$regex:search}},
            {description:{$regex:search}},
         ]}
    }]).then((resp)=>{ console.log({resp})
     res.json(resp)})
}