import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
/* eslint-disable */

// This was used before creating universal Table compound component:
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

import React, { useState } from "react";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const CabinRow = ({ cabin }) => {
  console.log(cabin);
  const [showForm, setShowForm] = useState(false);
  const [isDeleting, deleteCabin] = useDeleteCabin();
  const [isCreating, createCabin] = useCreateCabin();
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;
  const duplicateCabinHandler = (e) => {
    // because we cannot create another cabin with the same ID in the DB
    delete cabin.id;
    createCabin({ ...cabin, name: `Copy of ${name}` });
  };
  const deleteCabinHandler = () => {
    console.log("QWE");
    console.log(cabinId);
    deleteCabin(cabinId);
  };
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div className="gap-2">
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={duplicateCabinHandler}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit-form">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens={"delete-cabin"}>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit-form">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete-cabin">
                <ConfirmDelete
                  onConfirm={deleteCabinHandler}
                  resourceName={cabin.name}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
