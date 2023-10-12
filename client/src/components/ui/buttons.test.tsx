import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render Button', () => {
    const { getByText } = render(<Button>test</Button>);

    expect(getByText('test')).toBeInTheDocument();
  });
});
