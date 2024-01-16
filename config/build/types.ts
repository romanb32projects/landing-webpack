export interface IBuildPaths {
	entry: string
	html: string
	public: string
	output: string
	src: string
}

export type TBuildMode = 'production' | 'development'
export type TBuildPlatform = 'mobile' | 'desktop'

export interface IBuildOptions {
	mode: TBuildMode
	analyzer?: boolean
	babel?: boolean
	port: number
	platform: TBuildPlatform
	paths: IBuildPaths
}

export type TEnvVariables = Partial<IBuildOptions>
