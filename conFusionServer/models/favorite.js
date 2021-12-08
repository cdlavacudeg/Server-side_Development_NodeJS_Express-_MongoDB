const mongoose=require('mongoose');
const Schema=mongoose.Schema;


var favoriteSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dish:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dish'
    }
},{
    timestamps: true
});

favoriteSchema.index({user:1,dish:1},{unique:true});
var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;