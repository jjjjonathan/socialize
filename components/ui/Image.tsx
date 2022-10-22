import NextImage, { ImageProps } from 'next/image';
import Link from 'next/link';
import { Cloudinary } from 'cloudinary-core';

interface Props extends Omit<ImageProps, 'src'> {
  publicId: string;
  variant?: 'circle';
  size: string;
  profilePicName: string;
  href?: string;
  blurPlaceholder?: boolean;
}

const Image = ({
  publicId,
  variant,
  size,
  alt,
  profilePicName,
  className,
  href,
  blurPlaceholder = false,
  ...props
}: Props) => {
  const sizeNum = Number(size);

  const cl = new Cloudinary({
    cloud_name: 'freespirited-turtledove',
    secure: true,
  });

  const src = cl.url(publicId, {
    width: sizeNum * 2,
    height: sizeNum * 2,
    crop: 'scale',
  });

  const blurDataURL = cl.url(publicId, {
    width: 10,
    height: 10,
    crop: 'scale',
  });

  const definedClassName = className || '';

  const image = () => {
    const imageClassName = () => {
      if (variant === 'circle') {
        if (href) {
          return 'circle';
        }
        return `circle ${definedClassName}`;
      }
      if (href) {
        return '';
      }
      return definedClassName;
    };

    return (
      <NextImage
        className={imageClassName()}
        alt={profilePicName ? `Profile picture of ${profilePicName}` : alt}
        width={size}
        height={size}
        placeholder={blurPlaceholder ? 'blur' : undefined}
        blurDataURL={blurPlaceholder ? blurDataURL : undefined}
        {...props}
        src={src}
      />
    );
  };

  if (href)
    return (
      <Link href={href} passHref>
        <a className={definedClassName}>{image()}</a>
      </Link>
    );

  return image();
};

export default Image;
