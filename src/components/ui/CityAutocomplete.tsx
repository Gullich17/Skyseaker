'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CITIES_DB, type CityEntry } from '@/data/cities';

interface CityAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  icon?: React.ReactNode;
}

export default function CityAutocomplete({
  value,
  onChange,
  placeholder = '',
  label,
  inputStyle,
  labelStyle,
  icon,
}: CityAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!value || value.length < 1) return [];
    const q = value.toLowerCase();
    return CITIES_DB.filter(
      (c) =>
        c.city.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.airports.some(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.code.toLowerCase().includes(q)
        )
    ).slice(0, 8);
  }, [value]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const selectCity = (city: string) => {
    onChange(city);
    setOpen(false);
  };

  const defaultInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    backgroundColor: 'rgba(14, 32, 45, 0.6)',
    border: '1px solid rgba(244, 221, 195, 0.12)',
    color: '#FFFFFF',
    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
    fontWeight: 300,
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
    borderRadius: '2px',
  };

  const defaultLabelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
    fontWeight: 500,
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: '#F4DDC3',
    marginBottom: '10px',
    display: 'block',
  };

  const mergedInputStyle = inputStyle ? { ...defaultInputStyle, ...inputStyle } : defaultInputStyle;
  const mergedLabelStyle = labelStyle ? { ...defaultLabelStyle, ...labelStyle } : defaultLabelStyle;

  // If icon is provided, ensure paddingLeft on input for space
  const finalInputStyle: React.CSSProperties = icon
    ? { ...mergedInputStyle, paddingLeft: mergedInputStyle.paddingLeft || '42px' }
    : mergedInputStyle;

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {label && <label style={mergedLabelStyle}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {icon && icon}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={(e) => {
            setFocused(true);
            e.currentTarget.style.borderColor = 'rgba(244,221,195,0.4)';
            if (value.length >= 1) setOpen(true);
          }}
          onBlur={(e) => {
            setFocused(false);
            e.currentTarget.style.borderColor =
              (inputStyle?.border ? String(inputStyle.border).replace(/^1px solid /, '') : 'rgba(244,221,195,0.12)');
          }}
          style={finalInputStyle}
          autoComplete="off"
        />
      </div>
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              marginTop: '4px',
              backgroundColor: '#0E202D',
              border: '1px solid rgba(244,221,195,0.15)',
              maxHeight: '280px',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            className="scrollbar-hide"
          >
            {suggestions.map((entry) => (
              <button
                key={entry.city}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectCity(entry.city);
                }}
                style={{
                  width: '100%',
                  display: 'block',
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(244,221,195,0.06)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(244,221,195,0.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#FFFFFF',
                      }}
                    >
                      {entry.city}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 300,
                        fontSize: '12px',
                        color: '#6B6B6B',
                        marginLeft: '8px',
                      }}
                    >
                      {entry.country}
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-wrap gap-2 mt-1"
                >
                  {entry.airports.map((apt) => (
                    <span
                      key={apt.code}
                      style={{
                        fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
                        fontWeight: 400,
                        fontSize: '11px',
                        color: '#F4DDC3',
                        backgroundColor: 'rgba(244,221,195,0.08)',
                        padding: '2px 8px',
                        borderRadius: '2px',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {apt.code} — {apt.name}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
