import React from "react";

// --- Configuration Constants ---

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;
const SECONDS_IN_WEEK = 604800;
// Using a standard average for a month
const SECONDS_IN_MONTH = 2629800;
const SECONDS_IN_YEAR = 31557600;

const SLIDER_RANGE = 100;
const EXPONENT = 3;

// --- Mapping Functions (Unchanged) ---

/**
 * Converts a linear slider value (e.g., -100 to 100) to an exponential world speed.
 */
const sliderToWorldSpeed = (sliderValue: number): number => {
    const sign = Math.sign(sliderValue);
    const percentage = Math.abs(sliderValue) / SLIDER_RANGE;
    const speed = sign * SECONDS_IN_YEAR * Math.pow(percentage, EXPONENT);
    return speed;
};

/**
 * Converts a world speed back to a linear slider value.
 */
const worldSpeedToSlider = (speed: number): number => {
    if (speed === 0) return 0;
    const sign = Math.sign(speed);
    const percentage = Math.abs(speed) / SECONDS_IN_YEAR;
    const sliderValue = sign * SLIDER_RANGE * Math.pow(percentage, 1 / EXPONENT);
    return sliderValue;
};

// --- NEW AND IMPROVED Label Formatting Function ---

/**
 * Formats the raw speed value into a human-readable string with appropriate time units.
 * e.g., "+10.5 days/sec", "-2.1 weeks/sec", etc.
 */
const formatSpeedLabel = (speed: number): string => {
    // If the speed is very slow (less than 1 second per second), we call it "Live"
    if (Math.abs(speed) < 1) {
        return 'Live';
    }

    const absSpeed = Math.abs(speed);
    const sign = speed > 0 ? '+' : '-';

    let value: number;
    let unit: string;

    // Find the most appropriate unit to display
    if (absSpeed >= SECONDS_IN_YEAR) {
        value = absSpeed / SECONDS_IN_YEAR;
        unit = 'year';
    } else if (absSpeed >= SECONDS_IN_MONTH) {
        value = absSpeed / SECONDS_IN_MONTH;
        unit = 'month';
    } else if (absSpeed >= SECONDS_IN_WEEK) {
        value = absSpeed / SECONDS_IN_WEEK;
        unit = 'week';
    } else if (absSpeed >= SECONDS_IN_DAY) {
        value = absSpeed / SECONDS_IN_DAY;
        unit = 'day';
    } else { // It must be >= SECONDS_IN_HOUR, but we'll use it as the fallback
        value = absSpeed / SECONDS_IN_HOUR;
        unit = 'hour';
    }

    // Use 1 decimal place for fractions, but 0 for whole numbers
    const formattedValue = value.toFixed(value % 1 !== 0 ? 1 : 0);

    // Add 's' for pluralization if the value isn't exactly 1
    const pluralUnit = parseFloat(formattedValue) === 1 ? unit : `${unit}s`;

    return `${sign}${formattedValue} ${pluralUnit}/sec`;
};


/**
 * A component with an exponential slider to control the world speed.
 */
function Speed({ worldSpeed, setWorldSpeed }: { worldSpeed: number; setWorldSpeed: React.Dispatch<React.SetStateAction<number>>}) {

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sliderValue = parseFloat(e.target.value);
        const newWorldSpeed = sliderToWorldSpeed(sliderValue);
        setWorldSpeed(newWorldSpeed);
    };

    const currentSliderValue = worldSpeedToSlider(worldSpeed);

    return (
        <div style={{
            zIndex: '5',
            color: '#00FF48',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '10px 15px',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: 'monospace'
        }}>
            <h5>{formatSpeedLabel(worldSpeed)}</h5>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Updated labels to be more generic */}
                <span>⏪</span>
                <input
                    type="range"
                    min={-SLIDER_RANGE}
                    max={SLIDER_RANGE}
                    step="0.1"
                    value={currentSliderValue}
                    onChange={handleSliderChange}
                    style={{ width: '200px', cursor: 'pointer' }}
                />
                <span>⏩</span>
            </div>
        </div>
    );
}

export default Speed;