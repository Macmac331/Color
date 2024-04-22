import { useState, useEffect } from "react";

const Form = () => {
    const [color1, setColor1] = useState('#ffffff');
    const [color2, setColor2] = useState('#ffffff');
    const [rating, setRating] = useState(0);
    const [colorClass, setColorClass] = useState('');
    const handleColorChange1 = (event) => {
        setColor1(event.target.value);
    };
    const handleColorChange2 = (event) => {
        setColor2(event.target.value);
    };

    const hexToRGB = (colorValue) => {
        const red = parseInt(colorValue.substring(1, 3), 16);
        const green = parseInt(colorValue.substring(3, 5), 16);
        const blue = parseInt(colorValue.substring(5, 7), 16);
        return [red, green, blue];
    };

    const getRelativeLuminance = (color) => {
        const sRGB = color.map((val) => {
            const s = val / 255;
            return s < 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    };

    const calculateContrastRatio = (color1, color2) => {
        const luminance1 = getRelativeLuminance(hexToRGB(color1));
        const luminance2 = getRelativeLuminance(hexToRGB(color2));
        const light = Math.max(luminance1, luminance2);
        const dark = Math.min(luminance1, luminance2);
        return (light + 0.05) / (dark + 0.05);
    };

    const calcRating = (value) => {
        let ratingText;
        let ratingVal;

        if (value > 12) {
            ratingText = "Super";
        } else if (value > 7) {
            ratingText = "Very Good";
        } else if (value > 5) {
            ratingText = "Good";
        } else if (value > 3) {
            ratingText = "Poor";
        } else {
            ratingText = "Very Poor";
        }

        return ratingText;
    };

    useEffect(() => {
        const contrastRatio = calculateContrastRatio(color1, color2);
        const ratingText = calcRating(contrastRatio);
        setColorClass(ratingText);
    }, [color1, color2]);

    return(
        <div className="h-screen flex items-center justify-center ">
            <div className="shadow-md w-[80vw] h-[50vh] flex justify-center p-4 md:w-[40vw] md:h-[60vh] lg:w-[30vw] ">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-center md:text-4xl">Color Contrast Checker</h1>
                    <div className=" flex justify-center">
                        <div className="flex flex-row justify-center mt-4 ">
                            <div className="flex flex-col mr-5">
                                <label className="text-center font-semibold text-lg">Color 1</label>
                                <input 
                                    type="color" 
                                    className="w-[20vw] h-[15vh] md:w-[10vw]"
                                    value={color1}
                                    onChange={handleColorChange1}/>
                                <label className="text-center font-bold text-xl">{color1}</label>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-center font-semibold text-lg">Color 2</label> 
                                <input 
                                    type="color" 
                                    className="w-[20vw] h-[15vh] md:w-[10vw]"
                                    value={color2}
                                    onChange={handleColorChange2}/>
                                <label className="text-center font-bold text-xl">{color2}</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center p-3 border-2" style={{background: color2}}>
                        <p style={{ color: color1}}>Lorem ipsum</p>
                    </div>
                    <div className="flex justify-center items-center flex-col mt-5">
                        <h2 className="text-lg">Rating:</h2>
                        <p className="text-4xl">{colorClass}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form