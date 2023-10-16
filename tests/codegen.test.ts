import path from "path"
import { getFileInfo, generateStorybookFileImpl } from "scripts/scriptLib/tsMorphCodegen"

import { describe, expect, it } from "vitest"

describe("generateStorybookFile", () => {
	it("should generate file in correct location", () => {
		const file = generateStorybookFileImpl("testComponent")
		const message = getFileInfo(file)
		expect(path.normalize(message.fileName)).toContain(path.normalize("src/stories"))
	})
})
