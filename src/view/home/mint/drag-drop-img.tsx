import { useEffect, useMemo } from "react";

import { useDropzone } from "react-dropzone";
import { useMintNftContext } from "../mint-context";

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "black",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const thumb: React.CSSProperties = {
  // display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  width: "100%",
  height: "100%",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner: React.CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img: React.CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  maxHeight: "580px",
};

export function DrawDropImg() {
  const { setValueState, imageBlob } = useMintNftContext();
  // const [currentFiles, setCurrentFiles] = useState<any>([]);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (_acceptedFiles: any) => {
      const _files = _acceptedFiles.map((_file: Blob | MediaSource | File) =>
        Object.assign(_file, { preview: URL.createObjectURL(_file) }),
      );
      setValueState({ imageBlob: _files });
      // setCurrentFiles(_files);
    },
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );
  // const _files = acceptedFiles.map((file: any) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));
  const thumbs = imageBlob.map((_file: any) => (
    <div style={thumb} key={_file.name}>
      <div style={thumbInner}>
        <img
          alt={_file.name}
          src={_file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(_file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => imageBlob.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="container">
      <aside style={thumbsContainer}>{thumbs}</aside>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag drop file here, or click to select file</p>
      </div>
    </section>
  );
}
