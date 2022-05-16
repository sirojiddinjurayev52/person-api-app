import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PacmanLoader} from "react-spinners";

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            persons: [],
            selectedId: '',
            deleteModal: false,
            selectedItem: {},
            isLoading: true,
            saveLoading: false
        }
    }

    componentDidMount() {
        axios.get("https://627e6c46b75a25d3f3b7c568.mockapi.io/person")
            .then((res) => {
                this.setState({
                    persons: res.data,
                    isLoading: false
                })
            })
    }

    render() {

        const changeModal = () => {
            this.setState({
                openModal: !this.state.openModal
            })
        }

        const changeDeleteModal = () => {
            this.setState({
                deleteModal: !this.state.deleteModal
            })
        }

        const changeHandler = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        const checkedHandler = (e) => {
            this.setState({
                [e.target.name]: e.target.checked
            })
        }


        const savePerson = (e) => {
            e.preventDefault();
            this.setState({
                saveLoading: true
            })
            if (this.state.selectedItem.id){
                axios.put("https://627e6c46b75a25d3f3b7c568.mockapi.io/person/" + this.state.selectedItem.id, this.state)
                    .then((res) => {
                        getPerson();
                        changeModal();
                        toast.success("Muvaffaqiyatli o'zgartirildi!");
                    })
            } else {
                axios.post("https://627e6c46b75a25d3f3b7c568.mockapi.io/person", this.state)
                    .then((res) => {
                        getPerson();
                        changeModal();
                        toast.success("Muvaffaqiyatli saqlandi!");
                    })
                    .catch((error) => {
                        toast.error("Xatolik!!!");
                    })
                    .finally(() => {
                        this.setState({
                            saveLoading: false
                        })
                    })
            }
        }

        const deletePerson = (id) => {
            this.setState({
                selectedId: id
            })
            changeDeleteModal();
        }

        const deletePersonOriginal = () => {
            axios.delete("https://627e6c46b75a25d3f3b7c568.mockapi.io/person/" + this.state.selectedId)
                .then((res) => {
                    getPerson();
                    changeDeleteModal();
                    toast.success("Muvaffaqiyatli o'chirildi!");
                })
        }

        const editPerson = (item) => {
            this.setState({
                selectedItem: item
            })
            changeModal();
        }

        const getPerson = () => {
            axios.get("https://627e6c46b75a25d3f3b7c568.mockapi.io/person")
                .then((res2) => {
                    console.log(res2);
                    this.setState({
                        persons: res2.data
                    })
                })
        }
        return (
            <div className="person">
                <div className="loader">
                    {this.state.isLoading ?
                        <PacmanLoader color="#36D7B7" loading={this.state.isLoading}/>
                        : ""}
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <button type="button" className="btn btn-success ml-auto mt-5 d-block" onClick={changeModal}>Add</button>
                        </div>
                    </div>
                </div>

                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-striped table-hover table-dark">
                                        <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Name Surname Middle Name</th>
                                            <th>Age</th>
                                            <th>Is Married</th>
                                            <th>Gender</th>
                                            <th>Nationality</th>
                                            <th>Position</th>
                                            <th>Country</th>
                                            <th>City</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Update and Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.persons.map((item, index) => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{(index + 1)}</td>
                                                    <td>{item.firstName + " " + item.lastName + " " + item.middleName}</td>
                                                    <td>{item.age}</td>
                                                    <td>{item.isMarried ? "Yes" : "No"}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.national}</td>
                                                    <td>{item.position}</td>
                                                    <td>{item.country}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.email}</td>
                                                    <td className="d-flex justify-content-between align-items-center">
                                                        <button type="button" className="btn btn-success" onClick={() => editPerson(item)}>Edit</button>
                                                        <button type="button" className="btn btn-danger" onClick={() => deletePerson(item.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.openModal} toggle={changeModal}>
                    <ModalHeader>
                        <h3>Add Person Information</h3>
                    </ModalHeader>
                    <form onSubmit={savePerson}>
                        <ModalBody>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Firstname"
                                name="firstName"
                                onChange={changeHandler}
                            />
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Lastname"
                                name="lastName"
                                onChange={changeHandler}
                            />
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Middle name"
                                name="middleName"
                                onChange={changeHandler}
                            />
                            <input
                                type="number"
                                className="form-control mt-3"
                                placeholder="Age"
                                name="age"
                                onChange={changeHandler}
                            />
                            <span className="d-flex align-items-center mt-3">
                                <input
                                    type="checkbox"
                                    className="form-check mr-2"
                                    name="isMarried"
                                    onChange={checkedHandler}
                                /> Is Married?
                            </span>
                            <span className="d-flex align-items-center mt-3">
                                <input
                                    type="checkbox"
                                    className="form-check mr-2"
                                    name="gender"
                                    value="Male"
                                    onChange={changeHandler}
                                /> Male
                                <input
                                    type="checkbox"
                                    className="form-check mx-2"
                                    name="gender"
                                    value="Female"
                                    onChange={changeHandler}
                                /> Female
                            </span>
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Nationality"
                                name="national"
                                onChange={changeHandler}
                            />
                            <select name="position" className="form-control mt-3" onChange={changeHandler}>
                                <option>Choose select</option>
                                <option value="CEO">CEO</option>
                                <option value="Manager">Manager</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Security">Security</option>
                                <option value="Driver">Driver</option>
                                <option value="Student">Student</option>
                                <option value="Programmer">Programmer</option>
                                <option value="Sales">Sales</option>
                            </select>
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Country"
                                name="country"
                                onChange={changeHandler}
                            />
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="City"
                                name="city"
                                onChange={changeHandler}
                            />
                            <input
                                type="number"
                                className="form-control mt-3"
                                placeholder="Phone"
                                name="phone"
                                onChange={changeHandler}
                            />
                            <input
                                type="email"
                                className="form-control mt-3"
                                placeholder="Email"
                                name="email"
                                onChange={changeHandler}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <button type="submit" className="btn btn-success" disabled={this.state.saveLoading}>Save</button>
                            <button type="button" className="btn btn-secondary" onClick={changeModal}>Cancel</button>
                        </ModalFooter>
                    </form>
                </Modal>

                <Modal isOpen={this.state.deleteModal} toggle={changeDeleteModal}>
                    <ModalBody>
                        <h4>Rostdan ham o'chirmoqchimisiz?😥</h4>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-danger" onClick={deletePersonOriginal}>Ha</button>
                        <button type="button" className="btn btn-secondary" onClick={changeDeleteModal}>Yo'q</button>
                    </ModalFooter>
                </Modal>

                <ToastContainer autoClose={3000} position={"top-center"}/>
            </div>
        );
    }
}

export default Person;