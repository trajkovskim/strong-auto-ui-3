import { useCallback } from 'react';
import { Language } from 'context/base/types';
import { useLanguage } from 'hooks';
import messages_mk from 'assets/messages_mk.json';
import messages_en from 'assets/messages_en.json';

const messages: Record<Language, Record<string, unknown>> = {
  [Language.EN]: messages_en,
  [Language.MK]: messages_mk,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDataByPath = (data: any, path: string, discriminator: string): string => {
  if (!path) {
    return data;
  }

  const paths = path.split(discriminator);

  for (const key of paths) {
    if (!data) {
      return path;
    }

    data = data[key];
  }

  return data;
};

const useTranslation = (prefix = '', discriminator = '.') => {
  const { language } = useLanguage();
  const basePrefix = prefix.length == 0 ? 'kostadinka' : `kostadinka.${prefix}`;

  return useCallback(
    (key: string): string => {
      const path = `${basePrefix}.${key}`;
      const message = getDataByPath(messages[language], path, discriminator);
      return message ?? path;
    },
    [basePrefix, discriminator, language]
  );
};

export default useTranslation;
