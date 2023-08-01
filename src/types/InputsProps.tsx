import { ChangeEvent } from "react";

export type InputsProps = {
    inputValue: string
    setinputValue: Function
    // onchange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    setisValid: Function
    type: string
    PlaceHolder: string
    icon: string
    Border: string
    Color: string
    BorderSize: number
    isReg: boolean
}

export type ConfirmProps = {
    ConfirmPassword: string;
    setConfirmPassword: Function
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    setisValid: Function
    PlaceHolder: string
    icon: string
    Border: string
    Color: string
    BorderSize: number
    isReg: boolean
}
