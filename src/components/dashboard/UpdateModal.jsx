import { authClient } from "@/lib/auth-client";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BiEdit, BiUser } from "react-icons/bi";


const UpdateModal = () => {

    const onSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = e.target.photoUrl.value;


        await authClient.updateUser({
            image: photo,
            name: name,
        })
        
    }
    return (
        <Modal>
            <Button variant="secondary"> <BiEdit /> Updated Profile</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header className="text-center flex justify-center items-center ">
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <BiUser />
                            </Modal.Icon>
                            <Modal.Heading className="font-semibold">Update User Information</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    <TextField className="w-full" name="name" type="text">
                                        <Label>Name</Label>
                                        <Input placeholder="Enter your name" />
                                    </TextField>
                                    <TextField className="w-full" name="photoUrl" type="text">
                                        <Label>Photo Url</Label>
                                        <Input placeholder="Photo Url" />
                                    </TextField>

                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close">Save</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateModal;