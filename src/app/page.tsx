"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface reduction{
  WithReduction : number
  WithoutReduction : number
  is_reduced : boolean
}

export default function Home() {
  const [Neople, setNeople] = useState<number>(1)
  const [PriceWithReduction, setPriceWithReduction] = useState<number>()
  const [PriceWithoutReduction, setPriceWithoutReduction] = useState<number>()
  const [isReduced, setIsReduced] = useState<boolean>(false)

  const LessP = () => {
    if (Neople != 0){
      setNeople(Neople - 1)
    }
  }

  const HighP = () => {
    setNeople(Neople + 1)
  }

  useEffect(() => {
    function TeamsPrice(
      number_of_teams: number, // Number of people in teams choice by user
      price_by_person: number = 39, // Price by person without reduction ( e.g. 39 $ like HeadShotPro)
      reduction_pourcentage: number[] = [0.8, 0.7, 0.5], // take 3 reduction pourcentage ( e.g. [0.8, 0.7, 0.5] like HeadShotPro)
      reduction_echelon: number[] = [5, 10, 50] // take 3 reduction echelon ( e.g. [5, 10, 50] like HeadShotPro)
    ) : reduction{
      if( number_of_teams < reduction_echelon[0] ){
        return {
          WithReduction : parseFloat((number_of_teams * price_by_person).toFixed(2)),
          WithoutReduction : parseFloat((number_of_teams * price_by_person).toFixed(2)),
          is_reduced : false
        }
      } else if ( number_of_teams < reduction_echelon[1] ){
        return {
          WithReduction : parseFloat((number_of_teams * price_by_person * reduction_pourcentage[0]).toFixed(2)),
          WithoutReduction : parseFloat((number_of_teams * price_by_person).toFixed(2)),
          is_reduced : true
        }
      } else if ( number_of_teams < reduction_echelon[2] ){
        return {
          WithReduction : parseFloat((number_of_teams * price_by_person * reduction_pourcentage[1]).toFixed(2)),
          WithoutReduction : parseFloat((number_of_teams * price_by_person).toFixed(2)),
          is_reduced : true
        }
      } else {
        return {
          WithReduction : parseFloat((number_of_teams * price_by_person * reduction_pourcentage[2]).toFixed(2)),
          WithoutReduction : parseFloat((number_of_teams * price_by_person).toFixed(2)),
          is_reduced : true
        }
      }
    }
    setPriceWithReduction(TeamsPrice(Neople).WithReduction)
    setPriceWithoutReduction(TeamsPrice(Neople).WithoutReduction)
    setIsReduced(TeamsPrice(Neople).is_reduced)
  }, [Neople])


  return (
    <div className='middle w-[1000px] flex justify-center items-center gap-10 flex-col'>
      <div className='flex flex-row gap-5'>
          <Button variant={"outline"} size="icon" onClick={LessP}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          
          <Input 
            placeholder='Number people in teams'
            value={Neople}
            className='w-[200px] text-center'
            onChange={(e) => setNeople(parseInt(e.target.value || '0'))}
          />

          <Button variant={"outline"} size="icon" onClick={HighP}>
            <ChevronRight className='h-4 w-4' />
          </Button>
      </div>
      <div className='border rounded-xl text-center px-[150px] py-[20px] flex flex-col gap-4'>
        {
          isReduced ? <p className='text-2xl line-through'>{PriceWithoutReduction} $</p> : null
        }
        <p className={`text-2xl ${isReduced ? "text-blue-500" : "text-red-500"}`}>{PriceWithReduction} $</p>
      </div>
    </div>
  )
}