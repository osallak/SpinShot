import { ChangeEvent } from "react";

export type InputsProps = {
    inputValue: string
    setinputValue: Function
    value: string
    setisValid: Function
    type: string
    PlaceHolder: string
    icon: string
    Border: string
    Color: string
    BorderSize: number
    Reg: RegExp
}

export type ConfirmProps = {
    Password: string
    inputValue: string
    setinputValue: Function
    value: string
    setisValid: Function
    setisMatch: Function
    type: string
    PlaceHolder: string
    icon: string
    Border: string
    Color: string
    BorderSize: number
    Reg: RegExp
}
