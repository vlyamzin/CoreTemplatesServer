export interface PictureArtifacts {
    artifact: string;
    authorizationMethod: string;
    identifiers: [
        {
            identifier: string;
            file: string;
            index: number;
            mediaType: string
        }
    ];
}

export interface PictureData {
    paging: any;
    elements: PictureArtifacts[];
}

interface Picture {
    displayImage: string;
    'displayImage~'?: PictureData ;
}

export interface LiImageDto {
    profilePicture: Picture;
}
