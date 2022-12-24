import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';

type AddItemFromPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFromPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const errorStyles = {fontWeight: "bold", color: "red"}
    const errorMessage = error
        ? <div style={errorStyles}>Please, enter new title</div>
        : null
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <input
                value={title}
                onKeyDown={onEnterAddItem}
                onChange={setLocalTitle}
                className={error ? "input-error" : ""}
            />
            {/*<button onClick={addItem}>+</button>*/}
            <Button
                size='small'
                sx={{height:'20px', fontSize:'10px', py:'8px', minWidth: 'fit-content'}}
                variant='contained'
                endIcon={<PostAddIcon/>}
                onClick={addItem}>Add</Button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;