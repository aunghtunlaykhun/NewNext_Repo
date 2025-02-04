import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";


const questions = [
  {
    _id:'1',
    title:'How to learn React?',
    description:'I want to learn React , can you help me?',
    tags:[
      {_id:'1',name:'React'},
      {_id:'2',name:'React'}
    ],
    author:{
      _id:'1',name:'John Doe',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s'
    },
    upvotes:10,
    answers:5,
    views:100,
    createdAt:new Date(),
  },
  {
    _id:'2',
    title:'How to learn JavaScript?',
    description:'I want to learn React , can you help me?',
    tags:[
      {_id:'1',name:'Javascript'},
      {_id:'2',name:'Javascript'}
    ],
    author:{
      _id:'1',name:'John Doe',image:'https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-illustration-download-in-svg-png-gif-file-formats--young-female-girl-avatar-portraits-pack-people-illustrations-6590622.png'
    },
    upvotes:10,
    answers:5,
    views:100,
    createdAt:new Date('2021-09-01'),
  }
]

interface SearchParams {
  searchParams:Promise<{[key:string]:string}>
}

export default async function Home({searchParams}:SearchParams) {
  const { query = '', filter = '' } = await searchParams;
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter ? question.tags[0].name.toLowerCase() === filter.toLowerCase() : true ; 
    return matchesQuery && matchesFilter;
  }
  ); 

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
         <h1 className="h1-bold text-dark100_light900">All Questions</h1>

         <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900" asChild>
            <Link href={ROUTES.ASK_QUESTION}>Ask a questions</Link>
         </Button>
      </section>
      <section className="mt-11 ">
        <LocalSearch imgSrc={'/icons/search.svg'} route="/" placeholder="search questions..." otherClasses="flex-1" />
      </section>
      <HomeFilter/>
      <div className="mt-10 flex w-full flex-col gap-6">
          {
            filteredQuestions.map((question)=>(
              <QuestionCard key={question._id} question={question} />
            ))
          }
      </div>
    </>
  );
}
