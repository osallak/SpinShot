import error from "../../public/404.svg";
import Image from "next/image";

const ErrorPage = () => {
  return (
	<div className="w-screen h-screen flex justify-center items-center">
		<Image src={error} alt="404" width={500} height={500} className="w-screen h-screen flex justify-center items-center"/>
	</div>
  )
}

export default ErrorPage