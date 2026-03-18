import { NavLink } from "react-router-dom"

let PageNotFound= ()=>{

    return <section className=" bg-slate-700 h-[100vh]">
        <main className="p-20">
            <article className="font-semibold text-4xl">Page Not Found...</article>
            <article className="flex gap-4 pt-5"><aside className="text-2xl font-mono">Go back to</aside><NavLink to={"/"} className={"h-[35px] w-[80px] rounded-sm flex items-center justify-center  bg-blue-600"}>Home</NavLink></article>
        
        </main>
        
    </section>
}

export default PageNotFound