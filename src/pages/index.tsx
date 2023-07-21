"use client";
 
import { ThemeProvider, Button } from "@material-tailwind/react";
 
export { ThemeProvider, Button };
import SimpleButton from '@/Components/ui/Buttons/SimpleButton'
import EmptyButton from '@/Components/ui/Buttons/EmptyButton';
import ExportChannels from '../../public/ExportChannels.svg'
import CreateChannel from '../../public/CreateChannel.svg'
import { useRouter } from 'next/router'
import ContinueWithIntra from '@/Components/ui/Buttons/ContinueWithIntra';
import IconButton from '@/Components/ui/Buttons/IconButton';
import ToggleButton from "@/Components/ui/Buttons/ToggleButton";

export default function Home() {
  const Router = useRouter();
  const onclick = (Path: string) => {
    Router.push(Path);
  }
  return (
    <ThemeProvider>
      <div className='bg-very-dark-purple fixed left-0 top-0 w-full h-full flex justify-center items-center flex-col space-y-12 '>
        <SimpleButton onclick={() => {onclick("/SignIn")}} content="Get Started"/>
        <SimpleButton onclick={() => {onclick("/SignIn")}} content="Sign in"/>
        <EmptyButton onclick={() => {onclick("/SignIn")}} content="Sign in" />
        <ContinueWithIntra onclick={() => {onclick("/Enter")}} content="Continue with intra"/>
        <div className='flex space-x-2 flex-row'>
          <IconButton onclick={() => {onclick("/Enter")}} content="Create channel" icon={CreateChannel} />
          <IconButton onclick={() => {onclick("/Enter")}} content="Explore channels" icon={ExportChannels} />
        </div>
        <ToggleButton />
      {/* Inputs */}
      <div className="flex flex-col">
        <input type="username" value="Username or Email" className="rounded-lg text- w-80 h-12 border-2 bg-transparent opacity-40" />
      </div>
      </div> 
    </ThemeProvider>)
}
