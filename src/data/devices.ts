// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	phone: [
		{
			name: "nothing phone 3a",
			image: "/images/device/nothing.jpg",
			specs: "白色 / 12G + 256G",
			description:
				"open phone,中端甜品玩具.",
			link: "https://us.nothing.tech/products/phone-3a?Colour=White&Capacity=12%2B256GB",
		},
	],
};
