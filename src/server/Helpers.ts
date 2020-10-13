
    // export function getBlobFromString(img) {
    //     img = img.replace("data:image/png;base64,", "");
    //     var decoded = Utilities.base64Decode(img);
    //     var blob = Utilities.newBlob(decoded, MimeType.PNG);
    //     return blob;
    // }

    import Blob = GoogleAppsScript.Base.Blob;

    export const Helpers = {
        blobToDataUri(blob:Blob) {
            const base64 = this.blobToBase64(blob);
            const mime = blob.getContentType();
            return `data:${mime};base64,${base64}`;
        },

        blobToBase64(blob:Blob) {
            const base64 = Utilities.base64Encode(blob.getBytes());

            return base64;
        }
    }
