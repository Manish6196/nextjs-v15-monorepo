import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
  it('renders homepage unchanged', () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });

  it('renders a Welcome heading with H1 tag', () => {
    render(<Page />);
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Hello there, Welcome naboo 👋',
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders a You're up heading with H2 tag", () => {
    render(<Page />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: "You're up and running",
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders a What's next? link", () => {
    render(<Page />);
    const link = screen.getByRole('link', {
      name: "What's next?",
    });
    expect(link).toBeInTheDocument();
  });
});
