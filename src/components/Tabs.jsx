import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTabContent } from '../Store/TabSlice/tabListSlice';
import ClipLoader from 'react-spinners/ClipLoader';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const content = useSelector((state) => state.tabs.content);
  const status = useSelector((state) => state.tabs.status);
  const error = useSelector((state) => state.tabs.error);

  useEffect(() => {
    const handleTab = async () => {
      await dispatch(getTabContent());
    };
    handleTab();
  }, [dispatch]);

  const parseHtmlResponse = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const sections = [];
    let currentSection = null;
    Array.from(tempDiv.children).forEach(element => {
      if (/^H[1-6]$/.test(element.tagName)) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = { header: element.outerHTML, content: [] };
      } else if (currentSection) {
        currentSection.content.push(element.outerHTML);
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  };

  const result = parseHtmlResponse(content);

  return (
    <div className="w-full">
      {status === 'loading' ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color="#085c7c" loading={true} />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error: {error}</div>
      ) : (
        <>
          <div className="flex border-b border-gray-300">
            {result.map((section, index) => (
              <button
                key={index}
                className={`flex-1 px-4 py-5 hover:bg-gray-800 ${
                  activeTab === index
                    ? 'bg-[#085c7c] text-white'
                    : 'bg-black text-gray-400'
                }`}
                onClick={() => setActiveTab(index)}
              >
                Tab {index + 1}
              </button>
            ))}
          </div>

          <div className="p-16 border-gray-300 bg-white">
            <div
              className="font-bold text-[22px]"
              dangerouslySetInnerHTML={{ __html: result[activeTab]?.header }}
            />
            <div className="mt-6">
              {result[activeTab]?.content.map((paragraph, idx) => (
                <p className="" key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tabs;
