import { visit } from "unist-util-visit";

/**
 * 增强型图片宽度解析插件
 * 支持多种 Markdown 缩放表达式：
 * 1. ![alt w-50%](url) 或 ![w-50%](url)
 * 2. ![alt 50%](url) 或 ![50%](url)
 * 3. ![alt 500px](url) 或 ![500px](url)
 * 4. ![alt|w-50%](url) 或 ![alt|50%](url) 或 ![alt|500](url)
 */
export function rehypeImageWidth() {
	// 依次匹配模式：
	// 1. (?:[|\s]+)(?:w-)?([0-9]+)%
	// 2. (?:[|\s]+)([0-9]+)(?:px)?
	const widthPatterns = [
		/(?:[|\s]+)(?:w-)?([0-9]+)%$/i,        // 匹配 50% 或 w-50% 或 |w-50% 或 |50%
		/(?:[|\s]+)(?:w-)?([0-9]+)(?:px)?$/i   // 匹配 500px 或 w-500 或 |500 或 |500px
	];

	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (
				node.tagName === "img" &&
				node.properties &&
				node.properties.alt
			) {
				let alt = String(node.properties.alt).trim();
				let parsedWidth = null;

				// 检查百分比匹配
				let match = alt.match(widthPatterns[0]);
				if (match) {
					parsedWidth = `${match[1]}%`;
					alt = alt.replace(widthPatterns[0], "").trim();
				} else {
					// 检查像素匹配
					match = alt.match(widthPatterns[1]);
					if (match) {
						parsedWidth = `${match[1]}px`;
						alt = alt.replace(widthPatterns[1], "").trim();
					}
				}

				if (parsedWidth) {
					node.properties.alt = alt;
					node.properties.style = `width: ${parsedWidth}; max-width: 100%; height: auto; display: block; margin: 0 auto;`;

					const figureChildren = [node];

					if (node.properties.title) {
						const figcaption = {
							type: "element",
							tagName: "figcaption",
							properties: {
								style: "text-align: center; margin-top: 0.5em; font-size: 0.9em; color: var(--text-muted, #666);",
							},
							children: [
								{
									type: "text",
									value: node.properties.title,
								},
							],
						};
						figureChildren.push(figcaption);
					}

					const figure = {
						type: "element",
						tagName: "figure",
						properties: {
							style: "margin: 1.5em 0; display: flex; flex-direction: column; align-items: center; justify-content: center;",
						},
						children: figureChildren,
					};

					if (parent && index !== undefined) {
						parent.children[index] = figure;
					}
				}
			}
		});
	};
}

