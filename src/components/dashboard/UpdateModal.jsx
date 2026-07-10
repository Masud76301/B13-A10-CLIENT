'use client';

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React from "react";
import { BiEdit, BiUser } from "react-icons/bi";

const UpdateModal = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photoUrl.value;

        await authClient.updateUser({
            image: photo,
            name: name,
        });
    };

    return (
        <Modal>
            <Button 
                variant="secondary" 
                className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/50"
            > 
                <BiEdit className="text-amber-500 text-lg" /> Update Profile
            </Button>
            
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md w-[90vw] bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden">
                        <Modal.CloseTrigger />
                        <Modal.Header className="text-center flex flex-col justify-center items-center p-6 pb-2 gap-2">
                            <Modal.Icon className="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 p-2.5 rounded-full flex items-center justify-center">
                                <BiUser className="text-xl" />
                            </Modal.Icon>
                            <Modal.Heading className="font-bold text-xl text-gray-800 dark:text-zinc-100">Update User Information</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body className="p-6 pt-2">
                            <Surface variant="default" className="border-none bg-transparent p-0 shadow-none">
                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    
                                    {/* Name input - passed defaultValue into TextField directly */}
                                    <div className="flex flex-col gap-1 w-full">
                                        <TextField name="name" defaultValue={user?.name || ""}>
                                            <Label className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Name</Label>
                                            <Input placeholder="Enter your name" />
                                        </TextField>
                                    </div>
                                    
                                    {/* Photo Url input - passed defaultValue into TextField directly */}
                                    <div className="flex flex-col gap-1 w-full">
                                        <TextField name="photoUrl" defaultValue={user?.image || ""}>
                                            <Label className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Photo Url</Label>
                                            <Input placeholder="Photo Url" />
                                        </TextField>
                                    </div>

                                    <Modal.Footer className="flex items-center justify-end gap-3 pt-4 border-t dark:border-zinc-800/60 mt-2">
                                        <Button slot="close" variant="secondary" className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-zinc-400">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close" className="px-5 py-2 text-sm text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm font-medium">
                                            Save
                                        </Button>
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