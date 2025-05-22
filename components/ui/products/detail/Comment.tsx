import React from 'react'
import { CalificationStars } from '../CalificationStars'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Image } from '@heroui/image'

export const Comment = () => {
  return (
    <Card className='w-[380px] bg-default-200 p-2' radius='sm'>
        <CardHeader className='flex flex-col gap-[1px]'>
            <div className='flex w-full justify-between gap-2'>
                <span className='font-semibold line-clamp-1'>Lorem, ipsum dolor sit amet consectetur.</span>
                <CalificationStars stars={4} size='sm' />
            </div>
            <div className='flex w-full justify-between text-sm'>
                <span className='text-xs'>por <b>Usuario</b></span>
                <small>hace 5 meses</small>
            </div>
        </CardHeader>
        <CardBody className='py-0 px-2 flex gap-2 pb-2'>
            <Image className='object-cover' radius='sm' width={150} height={150} src={'https://photos-us.bazaarvoice.com/photo/2/cGhvdG86ZmFsYWJlbGxhLWNv/3e45c4f2-1091-5e9d-ad37-d2c687856ed0'} />
            <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis commodi nihil aliquam modi corporis velit qui alias eligendi dolores necessitatibus incidunt non perferendis similique dignissimos magnam, tenetur, rerum quia vero!</p>
        </CardBody>
    </Card>
  )
}
