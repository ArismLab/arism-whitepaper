import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import GridPattern from './GridPattern'

const Highlight = ({ highlight }) => {
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const onMouseMove = ({ currentTarget, clientX, clientY }) => {
		const { left, top } = currentTarget.getBoundingClientRect()
		mouseX.set(clientX - left)
		mouseY.set(clientY - top)
	}

	const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
	const style = { maskImage, WebkitMaskImage: maskImage }

	return (
		<div
			onMouseMove={onMouseMove}
			className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-zinc-950 dark:hover:shadow-black/5"
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
					<GridPattern
						width={72}
						height={56}
						x="50%"
						className="dark:fill-white/[0.01] dark:stroke-white/10 absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.01] stroke-black/5"
						{...highlight.pattern}
					/>
				</div>
				<motion.div
					className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-100 to-secondary-100 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-primary-800 dark:to-secondary-800"
					style={style}
				/>
				<motion.div
					className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
					style={style}
				>
					<GridPattern
						width={72}
						height={56}
						x="50%"
						className="dark:fill-white/2.5 absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:stroke-white/10"
						{...highlight.pattern}
					/>
				</motion.div>
			</div>
			<div className="ring-zinc-900/7.5 absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary-300 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
			<div className="relative rounded-2xl px-4 pb-4 pt-16">
				<div className="dark:bg-white/7.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:ring-white/15 dark:group-hover:bg-primary-300/10 dark:group-hover:ring-primary-800">
					<highlight.icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-primary-300/10 dark:group-hover:stroke-primary-800" />
				</div>
				<h3 className="mt-4 text-lg font-semibold leading-7 text-zinc-900 dark:text-white">
          <span className="absolute inset-0 rounded-2xl" />
          {highlight.name}
				</h3>
				<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
					{highlight.description}
				</p>
			</div>
		</div>
	)
}

export default Highlight
