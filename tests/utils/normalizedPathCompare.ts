import path from "path"

export function arePathsEqual(path1: string, path2: string) {
	const path1_ = path.normalize(path1)
	const path2_ = path.normalize(path2)
	return path1_ === path2_
}
