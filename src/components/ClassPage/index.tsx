'use client';
import { useEffect, useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { api } from 'services/api';

import { CardAulas } from './CardModule';
// import ComplementaryMaterial from './ComplementaryMateial';
import { Aula, Modulo } from './type';
import VideoSection from './VideoSection';

export default function ClassPage({ classId }: { classId: string }) {
	const [aula, setAula] = useState<Aula>();
	const [modulos, setModulos] = useState<Modulo[]>();

	const handleAulaChange = (novaAula: Aula) => {
		setAula(novaAula);
	};

	useEffect(() => {
		(async () => {
			const response = await api.get(`/modulos/cursoId/${classId}`);
			setModulos(response.data);
		})();
	}, []);

	return (
		<Box
			width={'100%'}
			height={'100vh'}
			backgroundImage={"url('/img/bgHeroSection.png')"}
		>
			<Flex
				width={'100vw'}
				height={'100vh'}
				flexDirection={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				gap={4}
			>
				<Flex
					width={'26vw'}
					height={'88vh'}
					rounded={'21px'}
					bg={'#120E27'} //pra depois
					flexDir={'column'}
					alignItems={'center'}
					gap={4}
					padding={'35px'}
				>
					{modulos?.map((modulo) => (
						<CardAulas
							classId={classId}
							key={modulo.Id}
							onAulaChange={handleAulaChange}
							{...modulo}
						/>
					))}
				</Flex>
				<Flex>
					<Box
						width={'60vw'}
						height={'88vh'}
						bg={'#120E27'}
						rounded={'21px'}
						paddingX={'2.5vw'}
						paddingY={'2vh'}
						display={'flex'}
					>
						<VideoSection aula={aula} />
					</Box>
				</Flex>
			</Flex>
		</Box>
	);
}
