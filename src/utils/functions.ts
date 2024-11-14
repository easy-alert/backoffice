// #region IMPORTS
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { toast } from 'react-toastify';
import { Api } from '../services/api';
import { IMask, IUploadFile, IRequestListIntervals } from './types';
// #endregion

export const catchHandler = (err: any) => {
  toast.dismiss();
  if (err.response) {
    toast.error(err.response.data.ServerMessage.message);
  } else {
    toast.error('Erro de comunicação');
  }
};

// #region DATES
export const dateFormatter = (date: string) => new Date(date).toLocaleDateString('pt-BR');

export const dateTimeFormatter = (date: string) =>
  new Date(date).toLocaleString('pt-BR').substring(0, 17);
// #endregion

// #region UPLOAD
export async function uploadManyFiles(files: any) {
  let response = {};

  const formData = new FormData();

  for (let i = 0; i < files.length; i += 1) {
    formData.append('files', files[i]);
  }

  await Api.post('/upload/files', formData)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      catchHandler(err);
    });

  return response as IUploadFile[];
}

export async function uploadFile(file: any) {
  let response = {};

  const formData = new FormData();
  formData.append('file', file);

  await Api.post('upload/file', formData)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      catchHandler(err);
    });

  return response as IUploadFile;
}
// #endregion

// #region ERRORS
export const handleError = async ({ error }: { error: Error }) => {
  if (import.meta.env.PROD) {
    axios.post('https://ada-logs.herokuapp.com/api/easy-alert/errors/create', {
      projectName: 'EasyAlert',
      environment: window.location.host.includes('sandbox') ? 'Sandbox' : 'Production',
      side: 'Backoffice',
      errorStack: error.stack,
      extraInfo: { url: window.location.href, user: localStorage.getItem('user') ?? '' },
    });
  }
};
// #endregion

// #region MASKS
export const applyMask = ({
  mask,
  value,
}: {
  mask: 'CPF' | 'CNPJ' | 'TEL' | 'CEP' | 'BRL' | 'NUM';
  value: string;
}) => {
  let Mask: IMask = { value: '', length: 0 };

  switch (mask) {
    case 'CPF':
      Mask = {
        value: value
          .replace(/\D/g, '')
          .replace(/^(\d{9})(\d)/g, '$1-$2')
          .replace(/^(\d{6})(\d)/g, '$1.$2')
          .replace(/^(\d{3})(\d)/g, '$1.$2'),
        length: 14,
      };
      break;
    case 'CNPJ':
      Mask = {
        value: value
          .replace(/\D/g, '')
          .replace(/^(\d{12})(\d)/g, '$1-$2')
          .replace(/^(\d{8})(\d)/g, '$1/$2')
          .replace(/^(\d{5})(\d)/g, '$1.$2')
          .replace(/^(\d{2})(\d)/g, '$1.$2'),
        length: 18,
      };
      break;
    case 'CEP':
      Mask = {
        value: value.replace(/\D/g, '').replace(/^(\d{5})(\d)/g, '$1-$2'),
        length: 9,
      };
      break;
    case 'TEL':
      Mask = {
        value: value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d)/g, '($1) $2')
          .replace(/(\d)(\d{4})$/, '$1-$2'),
        length: 15,
      };
      break;
    case 'BRL':
      Mask = {
        value: (Number(value.replace(/[^0-9]*/g, '')) / 100).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        length: 17,
      };
      break;

    case 'NUM':
      Mask = {
        value: value.replace(/[^0-9]*/g, ''),
        length: 0,
      };
      break;

    default:
      break;
  }
  return Mask;
};

export const unMask = (value: string) => value.replace(/[^a-zA-Z0-9]/g, '');
export const unMaskBRL = (value: string) => value.replace(/[^0-9]/g, '');

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const convertToUrlString = (value: string) =>
  value
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '-')
    .replaceAll(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()
    .replaceAll('--', '-')
    .replaceAll('---', '-');

export const replaceInitialURLSlashes = (url: string) =>
  url.startsWith('//') ? url.slice(2) : url;

export const addInitialSlashesToURL = (url: string) =>
  url.startsWith('https://') || url.startsWith('http://') || url.startsWith('//')
    ? url
    : `//${url}`;

export const isURLValid = (url: string) =>
  url.startsWith('www.') ||
  url.startsWith('https://') ||
  url.startsWith('http://') ||
  url.startsWith('//');

export const convertStateName = (stateName: string) => {
  let UF = '';

  switch (stateName) {
    case 'Acre':
      UF = 'AC';
      break;
    case 'Alagoas':
      UF = 'AL';
      break;
    case 'Amapá':
      UF = 'AP';
      break;
    case 'Amazonas':
      UF = 'AM';
      break;
    case 'Bahia':
      UF = 'BA';
      break;
    case 'Ceará':
      UF = 'CE';
      break;
    case 'Espírito Santo':
      UF = 'ES';
      break;
    case 'Goiás':
      UF = 'GO';
      break;
    case 'Maranhão':
      UF = 'MA';
      break;
    case 'Mato Grosso':
      UF = 'MT';
      break;
    case 'Mato Grosso do Sul':
      UF = 'MS';
      break;
    case 'Minas Gerais':
      UF = 'MG';
      break;
    case 'Pará':
      UF = 'PA';
      break;
    case 'Paraíba':
      UF = 'PB';
      break;
    case 'Paraná':
      UF = 'PR';
      break;
    case 'Pernambuco':
      UF = 'PE';
      break;
    case 'Piauí':
      UF = 'PI';
      break;
    case 'Rio de Janeiro':
      UF = 'RJ';
      break;
    case 'Rio Grande do Norte':
      UF = 'RN';
      break;
    case 'Rio Grande do Sul':
      UF = 'RS';
      break;
    case 'Rondônia':
      UF = 'RO';
      break;
    case 'Roraima':
      UF = 'RR';
      break;
    case 'Santa Catarina':
      UF = 'SC';
      break;
    case 'São Paulo':
      UF = 'SP';
      break;
    case 'Sergipe':
      UF = 'SE';
      break;
    case 'Tocantins':
      UF = 'TO';
      break;
    case 'Distrito Federal':
      UF = 'DF';
      break;

    default:
      break;
  }

  return UF;
};

// #endregion

// #region REQUESTS

export const requestListIntervals = async ({ setTimeIntervals }: IRequestListIntervals) => {
  await Api.get('/timeinterval/list')
    .then((res) => {
      setTimeIntervals(res.data);
    })
    .catch((err) => {
      catchHandler(err);
    });
};
// #endregion
