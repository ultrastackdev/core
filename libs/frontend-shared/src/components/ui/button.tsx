import * as React from 'react';

function Button({ ...props }: React.ComponentProps<'button'>) {
  return <button {...props}></button>;
}

export { Button };
