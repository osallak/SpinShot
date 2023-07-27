import { input } from "@material-tailwind/react"

type TestProps = {
    Type: string;
    PlaceHolder: string;
    Regexp:string
}

const Input: React.FC<TestProps> = ({
    Type,
    PlaceHolder,
    Regexp,

}) => {
    return (
        <div className="w-96 h-24">
            <input type={Type} placeholder={PlaceHolder} className="w-full h-full rounded-2xl bg-transparent border-2 border-pearl"/>
        </div>
    )
}


const Test = () => {
    return (
        <div className="bg-very-dark-purple fixed left-0 top-0 w-full h-full flex flex-row justify-center space-x-10 items-center">
            <Input Type="password" PlaceHolder="Password" Regexp="/^.{6,}$/"/>
        </div>
    )
}

export default Test
