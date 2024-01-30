export interface IBuildPaths {
	entry: string;
	views: string;
	output: string;
	src: string;
}

export type TBuildMode = 'production' | 'development';
export type TBuildPlatform = 'mobile' | 'desktop';

export interface IBuildOptions<EnvType = boolean> {
	mode: TBuildMode;
	isAnalyzer?: EnvType;
	isBabel?: EnvType;
	isMinimizeImage?: EnvType;
	isDeploy?: EnvType;
	isWithHash?: EnvType;
	port: number;
	platform: TBuildPlatform;
	paths: IBuildPaths;
}

export type TEnvVariables<EnvType = boolean> = Partial<IBuildOptions<EnvType>>;
