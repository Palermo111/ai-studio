export async function getImageSize(
  file: File
): Promise<{
  width: number;
  height: number;
}> {
  return new Promise(
    (resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });

        URL.revokeObjectURL(image.src);
      };

      image.onerror = () => {
        URL.revokeObjectURL(image.src);

        reject(
          new Error(
            "Не удалось прочитать изображение."
          )
        );
      };

      image.src =
        URL.createObjectURL(file);
    }
  );
}