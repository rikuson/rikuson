import React from 'react';

interface FormattedDateProps {
  date: Date;
  className?: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({ date, className = '' }) => {
  return (
    <time dateTime={date.toISOString()} className={`text-muted ${className}`}>
      {date.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </time>
  );
};

export default FormattedDate;