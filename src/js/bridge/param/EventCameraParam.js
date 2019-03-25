import BridgeParam from "./BridgeParam";

const types = {
    imageCamera: 'imageCamera',
    imageAlbum: 'imageAlbum'
};

const cameraPositions = {
    front: '0',
    back: '1'
};

export default class EventCameraParam extends BridgeParam {
    constructor(type = '', cameraPosition = '', filterId = '', categoryId = '', stickerId = '', collageId = '') {
        super();
        if (!types[type]) throw `[illegal type] ${type}`;
        this.type = type;
        this.cameraPosition = cameraPosition;
        this.filterId = filterId;
        this.categoryId = categoryId;
        this.stickerId = stickerId;
        this.collageId = collageId;
        this.autoDownload = 'true';
    }

    static get types() {
        return types;
    }

    static get cameraPositions() {
        return cameraPositions;
    }
}
