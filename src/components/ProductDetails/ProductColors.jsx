import { useState } from "react";

function ProductColors() {

    const [color, setColor] = useState("Gray");

    return (
        <div className="option-section">

            <div className="option-label">

                Colors:
                <strong>
                    {color}
                </strong>

            </div>

            <div className="color-options">

                <button
                    className="color color-beige"
                    onClick={() => setColor("Beige")}
                />

                <button
                    className="color color-black"
                    onClick={() => setColor("Black")}
                />

                <button
                    className="color color-gray"
                    onClick={() => setColor("Gray")}
                />

            </div>

        </div>
    );
}

export default ProductColors;