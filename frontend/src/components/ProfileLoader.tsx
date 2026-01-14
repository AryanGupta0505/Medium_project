import styled from "styled-components";
export const ProfileLoader = () => {
  return (
    <LoaderCard>
      <div className="avatar-skeleton" />

      <div className="lines">
        <span className="line title" />
        <span className="line subtitle" />
      </div>
    </LoaderCard>
  );
};

const LoaderCard = styled.div`
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #e4e4e7; /* zinc-200 */
  border: 1px solid #d4d4d8; /* zinc-300 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  display: flex;
  align-items: center;
  gap: 1rem;

  .avatar-skeleton {
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background: linear-gradient(
      90deg,
      #d4d4d8 25%,
      #e5e7eb 37%,
      #d4d4d8 63%
    );
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
  }

  .lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .line {
    height: 14px;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      #d4d4d8 25%,
      #e5e7eb 37%,
      #d4d4d8 63%
    );
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
  }

  .line.title {
    width: 60%;
    height: 16px;
  }

  .line.subtitle {
    width: 80%;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

