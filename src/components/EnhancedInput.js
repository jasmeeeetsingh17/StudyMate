// src/components/EnhancedInput.js
import { useState, useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

export const EnhancedInput = ({
    value,
    onChange,
    onBlur,
    placeholder,
    label,
    type = 'text',
    required = false,
    minLength,
    maxLength,
    pattern,
    errorMessage,
    successMessage,
    showCharCount = false,
    icon: Icon,
    className = ''
}) => {
    const [touched, setTouched] = useState(false);
    const [validationState, setValidationState] = useState('idle'); // idle, validating, valid, invalid

    useEffect(() => {
        if (!touched || !value) {
            setValidationState('idle');
            return;
        }

        // Real-time validation
        const validateInput = () => {
            if (required && !value.trim()) {
                setValidationState('invalid');
                return;
            }

            if (minLength && value.length < minLength) {
                setValidationState('invalid');
                return;
            }

            if (maxLength && value.length > maxLength) {
                setValidationState('invalid');
                return;
            }

            if (pattern && !pattern.test(value)) {
                setValidationState('invalid');
                return;
            }

            setValidationState('valid');
        };

        const timer = setTimeout(validateInput, 300);
        return () => clearTimeout(timer);
    }, [value, touched, required, minLength, maxLength, pattern]);

    const handleBlur = (e) => {
        setTouched(true);
        onBlur?.(e);
    };

    const getValidationColor = () => {
        switch (validationState) {
            case 'valid': return 'border-green-500 focus:ring-green-500';
            case 'invalid': return 'border-red-500 focus:ring-red-500';
            default: return 'border-gray-600 focus:ring-blue-500';
        }
    };

    const getValidationIcon = () => {
        switch (validationState) {
            case 'valid': return <Check className="text-green-400" size={20} />;
            case 'invalid': return <AlertCircle className="text-red-400" size={20} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="flex items-center gap-2 text-gray-300 font-medium">
                    {Icon && <Icon size={16} />}
                    {label}
                    {required && <span className="text-red-400">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 transition-all duration-200 hover:border-gray-500 pr-12 ${getValidationColor()} ${className}`}
                />

                {/* Validation icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getValidationIcon()}
                </div>
            </div>

            {/* Character count */}
            {showCharCount && maxLength && (
                <div className="flex justify-end text-xs">
                    <span className={`${value.length > maxLength * 0.9 ? 'text-orange-400' : 'text-gray-400'}`}>
                        {value.length} / {maxLength}
                    </span>
                </div>
            )}

            {/* Error message */}
            {validationState === 'invalid' && errorMessage && touched && (
                <div className="flex items-center gap-2 text-red-400 text-sm animate-fadeIn">
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Success message */}
            {validationState === 'valid' && successMessage && (
                <div className="flex items-center gap-2 text-green-400 text-sm animate-fadeIn">
                    <Check size={14} />
                    <span>{successMessage}</span>
                </div>
            )}
        </div>
    );
};

export const EnhancedTextarea = ({
    value,
    onChange,
    onBlur,
    placeholder,
    label,
    required = false,
    minLength,
    maxLength,
    rows = 4,
    showCharCount = true,
    icon: Icon,
    className = ''
}) => {
    const [touched, setTouched] = useState(false);

    const handleBlur = (e) => {
        setTouched(true);
        onBlur?.(e);
    };

    const isValid = !required || (value && value.trim().length >= (minLength || 0));
    const showValidation = touched && value;

    return (
        <div className="space-y-2">
            {label && (
                <label className="flex items-center gap-2 text-gray-300 font-medium">
                    {Icon && <Icon size={16} />}
                    {label}
                    {required && <span className="text-red-400">*</span>}
                </label>
            )}

            <div className="relative">
                <textarea
                    value={value}
                    onChange={onChange}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    rows={rows}
                    className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 text-gray-100 placeholder-gray-400 transition-all duration-200 hover:border-gray-500 resize-none ${showValidation
                            ? isValid
                                ? 'border-green-500 focus:ring-green-500'
                                : 'border-red-500 focus:ring-red-500'
                            : 'border-gray-600 focus:ring-blue-500'
                        } ${className}`}
                />

                {/* Validation icon */}
                {showValidation && (
                    <div className="absolute right-3 top-3">
                        {isValid ? (
                            <Check className="text-green-400" size={20} />
                        ) : (
                            <AlertCircle className="text-red-400" size={20} />
                        )}
                    </div>
                )}
            </div>

            {/* Character count */}
            {showCharCount && maxLength && (
                <div className="flex justify-end text-xs">
                    <span className={`${value.length > maxLength * 0.9 ? 'text-orange-400' : 'text-gray-400'}`}>
                        {value.length} / {maxLength}
                    </span>
                </div>
            )}
        </div>
    );
};