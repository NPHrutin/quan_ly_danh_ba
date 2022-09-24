const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error")

exprort.create = async (req, res,next) => {
    if (!rep.body?.name){
        return next(new ApiError(400,"Name can not be empty"));
    }

    try{
        const contactSevice = new ContactService(MongoDB.client);
        const document = await contactSevice.create(req.body);
        return res.send(document);
    }

    catch {
        return next(new ApiError(500,"An error occurred while creating the contact"));

    }
}
exports.findAll = async(req, res,next) => {
    let document = [];

    try{
        const contactSevice = new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            document = await contactSevice.findbyname(name);
        }
        else {
            document = await contactSevice.find({});
        }
    }

    catch(error) {
        return next(new ApiError(500,"An error occurred while creating the contact"));
    };
    return res.send(document);
};
exports.findOne = async (req, res,next) => {
    try{
        const contactSevice = new ContactService(MongoDB.client);
        const document = await contactSevice.findById(req.params.id);
        if(!document){
            return next(new ApiError (404 , "contact not found"));
        }
        return res.send(document);
    }
    catch(error) {
        return next(new ApiError(500,'Error retrieving contact with id = ${req.params.id}'));
    };
    return res.send(document);
};
exports.update = async (req, res,next) => {
    if(Object.keys(req.body).length === 0 ){
        return next(new ApiError(400,'Data to update can not be empty'));
    }
    try {
        const contactSevice = new ContactService(MongoDB.client);
        const document = await contactSevice.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError (404 , "contact not found"));
        }
        return res.send({message: "contact was updated successfully"});
    }
    catch(error) {
        return next(new ApiError(500,'Error update contact with id = ${req.params.id}'));
    };
};

exports.delete = async (req, res,next) => {
    try {
        const contactSevice = new ContactService(MongoDB.client);
        const document = await contactSevice.delete(req.params.id);
        if(!document){
            return next(new ApiError (404 , "contact not found"));
        }
        return res.send({message: "contact was deleted successfully"});
    }
    catch(error) {
        return next(new ApiError(500,'Error deleteS contact with id = ${req.params.id}'));
    };
};
exports.deleteAll =async (_req, res,next ) => {
    try {
        const contactSevice = new ContactService(MongoDB.client);
        const deleteCount = await contactSevice.deleteAll();
        return res.send({message: "${deletecount} contacts were deleted successfully"});
    }
    catch(error) {
        return next(new ApiError(500,'an error accurred while romoving all contacts}'));
    };
};
exports.findAllFavorite = async (_req, res,next) => {
    try {
        const contactSevice = new ContactService(MongoDB.client);
        const document = await contactSevice.findAllFavorite();
        return res.send(document);
    }
    catch(error) {
        return next(new ApiError(500,'An error accurred while retrieving facorite contacts}'));
    };
};

// require cac lop va ham duoc goi o dau tap tin
// const ContactService = require("../services/contact.service");
// const MongoDB = require("../utils/mongodb.util");
// const ApiError = require("../api-error")
// tạo và lưu liên lạc mới

// exprort.create = async (req, res,next) => {
//     if (!rep.body?.name){
//         return next(new ApiError(400,"Name can not be empty"));
//     }

//     try{
//         const contactSevice = new ContactService(MongoDB.client);
//         const document = await contactSevice.create(req.body);
//         return res.send(document);
//     }

//     catch {
//         return next(new ApiError(500,"An error occurred while creating the contact"));

//     }
// }