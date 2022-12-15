
 // Attention de ne pas avoir des références circulaire
 // const UsersRepository = require('./usersRepository'); pas ici sinon référence ciculaire
const ImageFilesRepository = require('./imageFilesRepository.js');
const ImageModel = require('./image.js');
const utilities = require("../utilities");
const HttpContext = require('../httpContext').get();

module.exports =
    class ImagesRepository extends require('./repository') {
        constructor() {
            super(new ImageModel(), true /* cached */);
            this.setBindExtraDataMethod(this.bindImageURL);
        }
        bindImageURL(image) {
            if (image) {
                let bindedImage = { ...image };
                if (image["GUID"] != "") {
                    bindedImage["OriginalURL"] = HttpContext.host + ImageFilesRepository.getImageFileURL(image["GUID"]);
                    bindedImage["ThumbnailURL"] = HttpContext.host + ImageFilesRepository.getThumbnailFileURL(image["GUID"]);
                } else {
                    bindedImage["OriginalURL"] = "";
                    bindedImage["ThumbnailURL"] = "";
                }
                return bindedImage;
            }
            return null;
        }
        add(image) {
            if (this.model.valid(image)) {
                image["GUID"] = ImageFilesRepository.storeImageData("", image["ImageData"]);
                delete image["ImageData"];
                return this.bindImageURL(super.add(image));
            }
            return null;
        }
        update(image) {
            if (this.model.valid(image)) {
                image["GUID"] = ImageFilesRepository.storeImageData(image["GUID"], image["ImageData"]);
                delete image["ImageData"];
                return super.update(image);
            }
            return false;
        }
        remove(id) {
            let foundImage = super.get(id);
            if (foundImage) {
                ImageFilesRepository.removeImageFile(foundImage["GUID"]);
                return super.remove(id);
            }
            return false;
        }
        getAll(params = null) {
            let images = super.getAll(params);
            let imageRetained = [];
            if (params != null && params.keywords != null) {

                let keywords = params.keywords.split(',');

                images.forEach(image => {
                    let imgDesc = image.Description.toLowerCase();
                    let imgTitle = image.Title.toLowerCase();
                    keywords.forEach(keyword => {
                        if (keyword != " ") {
                            keyword = keyword.toLowerCase();
                            let maintain = true;
                            if (imgDesc.includes(keyword) || imgTitle.includes(keyword)) {
                                imageRetained.forEach(img => {
                                    if (img == image) {
                                        maintain = false;
                                    }
                                })
                                if (maintain)
                                    imageRetained.push(image);
                            }
                        }
                    });
                });
                return imageRetained;
            }
            else
                return images;

        }
    }