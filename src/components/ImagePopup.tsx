import Popup from "reactjs-popup";

interface Props {
  open: boolean;
}

const ImagePopup = ({ open }: Props) => {
  const imageURL =
    "https://3.bp.blogspot.com/-jOhb20TY_X8/VAxe6QBzaeI/AAAAAAAALxs/air7j9c4X-c/s1600/good-job.png";

  return (
    <Popup open={open}>
      <img src={imageURL} style={{ width: 200, height: 200 }} />
    </Popup>
  );
};

export default ImagePopup;
