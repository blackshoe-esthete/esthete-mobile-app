import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type CustomSkeletonPlaceholderProps = {
  type: 'user' | 'exhibition';
};

const CustomSkeletonPlaceholder: React.FC<CustomSkeletonPlaceholderProps> = ({ type }) => {
  return (
    <SkeletonPlaceholder
      speed={800} // 애니메이션 속도 조절
      highlightColor="#f0f0f0" // 하이라이트 색
      backgroundColor="#cccccc" // 배경색
    >
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        {type === 'user' ? (
          <>
            {[...Array(4)].map((_, index) => (
              <SkeletonPlaceholder.Item
                key={index}
                width={100}
                height={100}
                borderRadius={50}
                marginRight={10}
                marginLeft={index === 0 ? 20 : 0}
              />
            ))}
          </>
        ) : (
          <>
            {[...Array(3)].map((_, index) => (
              <SkeletonPlaceholder.Item
                key={index}
                width={150}
                height={150}
                borderRadius={10}
                marginRight={10}
                marginLeft={index === 0 ? 20 : 0}
              />
            ))}
          </>
        )}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default CustomSkeletonPlaceholder;
