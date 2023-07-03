import { Circles } from "react-loader-spinner";
import { FIG_CHAIN } from "../../../config";
import { Modal } from "react-bootstrap";
import { useMintNftContext } from "../mint-context";

type Props = {
  isOpen: any;
  onClose: any;
};

export default function MintResultModal({ isOpen, onClose }: Props) {
  const { isLoading, resultSubmit } = useMintNftContext();

  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Nft Info</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container modal-nft-result">
          {isLoading ? (
            <Circles
              color="#24b196"
              height={100}
              width={100}
              wrapperStyle={{ justifyContent: "center", paddingTop: "8rem" }}
            />
          ) : (
            <div className="row">
              <div className="col-md-12">
                <p className="h5">Tx:</p>
                {resultSubmit.tx && (
                  <p className="h5 text-primary">
                    <a href={FIG_CHAIN.getExplorerTransactionLink(resultSubmit.tx)} target="_blank" rel="noreferrer">
                      {resultSubmit.tx} <i className="fa-solid fa-arrow-up-right-from-square fa-md"></i>
                    </a>
                  </p>
                )}
                <hr />
                <p className="h5 ">Nft Contract Address:</p>
                <p className="h5 text-primary">
                  <a
                    href={FIG_CHAIN.getExplorerAddressLink(resultSubmit.contractAddress)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resultSubmit.contractAddress} <i className="fa-solid fa-arrow-up-right-from-square fa-md"></i>
                  </a>
                </p>
                <hr />
                <p className="h5 ">CID:</p>
                <p className="h5 text-primary">
                  <a href={`https://gateway.pinata.cloud/ipfs/${resultSubmit.CID}`} target="_blank" rel="noreferrer">
                    {`ipfs://${resultSubmit.CID}`}
                  </a>
                </p>
                <hr />
                <p className="h5 ">Token ID:</p>
                <a
                  href={`${FIG_CHAIN.getExplorerAddressLink(resultSubmit.contractAddress)}/instance/${
                    resultSubmit.tokenID
                  }/token-transfers`}
                  target="_blank"
                  rel="noreferrer"
                  className="h5 text-primary"
                >
                  {resultSubmit.tokenID} <i className="fa-solid fa-arrow-up-right-from-square fa-md"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
