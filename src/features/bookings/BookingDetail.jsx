import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Empty from "../../ui/Empty";
import CheckoutButton from "../check-in-out/CheckoutButton";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const [isDeleting, removeBooking] = useDeleteBooking();
  const moveBack = useMoveBack();
  console.log(booking);
  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const deleteBookingHandler = () => {
    // as a second argument we can specify the onSuccess, onError or onSettled (no matter if error or not this will execute)
    // this is another way to implement this funcitons, instead of implementing them in the useDeleteBooking hook
    // we can implement them here as a object in the second argument of the mutation function.
    removeBooking(bookingId, { onSettled: () => moveBack() });
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          <Modal.Open opens="delete-booking">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              onConfirm={deleteBookingHandler}
              resourceName="booking"
            />
          </Modal.Window>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && <CheckoutButton bookingId={bookingId} />}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
