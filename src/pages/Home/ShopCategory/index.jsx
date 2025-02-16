import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import MotionBox from "@widgets/MotionBox";
import { fadeIn } from "@utils/animation";

import IconTshirt from '@icon/iconTshirt.svg';
import IconPant from '@icon/iconPant.svg';
import IconJacket from '@icon/iconJacket.svg';
import IconCap from '@icon/iconCap.svg';

const categories = [
  { icon: IconTshirt, name: "T-Shirt", description: "Comfortable and stylish tees for every occasion" },
  { icon: IconJacket, name: "Jacket", description: "Stay warm and fashionable with our jacket collection" },
  { icon: IconPant, name: "Pants", description: "From casual to formal, find the perfect pair" },
  { icon: IconCap, name: "Cap", description: "Top off your look with our trendy caps" },
];

const ShopCategory = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const handleClick = (category) => {
        console.log(category);
    }

    return (
        <div className="w-full px-4 md:px-20 py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-800">
                Explore Our <span className="text-primary">Categories</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
                {categories.map((category, index) => (
                    <MotionBox 
                        key={category.name} 
                        animation={fadeIn((index + 1) * 0.2)}
                        className="relative"
                    >
                        <div 
                            className={`bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group ${
                                hoveredCategory === category.name ? 'ring-2 md:ring-4 ring-primary' : ''
                            }`}
                            onMouseEnter={() => setHoveredCategory(category.name)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <div className="p-6 md:p-8 flex flex-col items-center justify-center h-64 sm:h-72 md:h-80 lg:h-96 relative">
                                <category.icon className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110" />
                                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">{category.name}</h3>
                                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-center px-4">
                                        {category.description}
                                    </p>
                                </div>
                                <Tooltip title="Shop Now" placement="bottom">
                                    <Button 
                                        type="primary" 
                                        shape="round" 
                                        size="large"
                                        className="mt-4 font-semibold text-base md:text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                                        onClick={() => handleClick(category.name)}
                                    >
                                        Explore
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </MotionBox>
                ))}
            </div>
        </div>
    );
};

export default ShopCategory;